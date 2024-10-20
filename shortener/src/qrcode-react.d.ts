declare module 'qrcode.react' {
    import * as React from 'react';
  
    export interface QRCodeProps {
      value: string;
      size?: number;
      bgColor?: string;
      fgColor?: string;
      level?: 'L' | 'M' | 'Q' | 'H';
      includeMargin?: boolean;
      renderAs?: 'svg' | 'canvas';
    }
  
    const QRCode: React.FC<QRCodeProps>;
  
    export default QRCode;
  }
  