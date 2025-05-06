import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SEO from './SEO';
import StructuredData from './StructuredData';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1a73e8;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #5f6368;
  margin-bottom: 2rem;
`;

const ColorPreview = styled.div<{ color: string }>`
  width: 100%;
  height: 100px;
  background-color: ${props => props.color};
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid #ddd;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #5f6368;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: monospace;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#000000');
  const [rgb, setRgb] = useState('rgb(0, 0, 0)');
  const [hsl, setHsl] = useState('hsl(0, 0%, 0%)');

  const hexToRgb = (hex: string): [number, number, number] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  };

  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const updateFromHex = (hexValue: string) => {
    setHex(hexValue);
    const rgbValues = hexToRgb(hexValue);
    if (rgbValues) {
      const [r, g, b] = rgbValues;
      setRgb(`rgb(${r}, ${g}, ${b})`);
      const [h, s, l] = rgbToHsl(r, g, b);
      setHsl(`hsl(${h}, ${s}%, ${l}%)`);
    }
  };

  const updateFromRgb = (rgbValue: string) => {
    setRgb(rgbValue);
    const match = rgbValue.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (match) {
      const [_, r, g, b] = match;
      const hexValue = '#' + [r, g, b]
        .map(x => parseInt(x).toString(16).padStart(2, '0'))
        .join('');
      setHex(hexValue);
      const [h, s, l] = rgbToHsl(parseInt(r), parseInt(g), parseInt(b));
      setHsl(`hsl(${h}, ${s}%, ${l}%)`);
    }
  };

  const updateFromHsl = (hslValue: string) => {
    setHsl(hslValue);
    const match = hslValue.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/);
    if (match) {
      const [_, h, s, l] = match;
      // Convert HSL to RGB
      const h1 = parseInt(h) / 360;
      const s1 = parseInt(s) / 100;
      const l1 = parseInt(l) / 100;

      let r, g, b;

      if (s1 === 0) {
        r = g = b = l1;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };

        const q = l1 < 0.5 ? l1 * (1 + s1) : l1 + s1 - l1 * s1;
        const p = 2 * l1 - q;

        r = hue2rgb(p, q, h1 + 1/3);
        g = hue2rgb(p, q, h1);
        b = hue2rgb(p, q, h1 - 1/3);
      }

      const rgb = [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
      ];

      setRgb(`rgb(${rgb.join(', ')})`);
      setHex('#' + rgb.map(x => x.toString(16).padStart(2, '0')).join(''));
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Container>
      <SEO
        title="Color Converter - Free Online Tool"
        description="Free online color converter. Convert between HEX, RGB, and HSL color formats. Fast, accurate, and easy to use."
        keywords="color converter, hex to rgb, rgb to hex, hsl converter, color format converter"
      />
      <StructuredData
        type="SoftwareApplication"
        name="Color Converter"
        description="Free online color converter. Convert between HEX, RGB, and HSL color formats. Fast, accurate, and easy to use."
        url="https://toolzilla.app/color-converter"
      />
      <Title>Color Converter</Title>
      <Description>
        Convert colors between HEX, RGB, and HSL formats with this easy-to-use tool.
      </Description>
      <ColorPreview color={hex} />
      <InputGroup>
        <Label>HEX Color</Label>
        <Input
          type="text"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          placeholder="#000000"
        />
      </InputGroup>
      <InputGroup>
        <Label>RGB Color</Label>
        <Input
          type="text"
          value={rgb}
          onChange={(e) => updateFromRgb(e.target.value)}
          placeholder="rgb(0, 0, 0)"
        />
      </InputGroup>
      <InputGroup>
        <Label>HSL Color</Label>
        <Input
          type="text"
          value={hsl}
          onChange={(e) => updateFromHsl(e.target.value)}
          placeholder="hsl(0, 0%, 0%)"
        />
      </InputGroup>
    </Container>
  );
};

export default ColorConverter; 