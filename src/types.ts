export enum Animation {
  None = 'none',
  Fade = 'fade',
  Pop = 'pop',
  PopFade = 'popFade',
  Slide = 'slide',
}

export enum Position {
  Down = 'down',
  Up = 'up',
  Left = 'left',
}

export enum Type {
  Circle = 'circle',
  Rectangle = 'rectangle',
}

/**
 * Original options that can be passed to favico.js library instance
 * @todo Replace 'bgColor' and 'textColor' types with regex-validated ones when PR will be resolved
 * @see https://github.com/Microsoft/TypeScript/issues/6579
 */
export interface FavicoJsOptions {
  bgColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontStyle?: string;
  type?: Type;
  position?: Position;
  animation?: Animation;
  elementId?: string;
  element?: HTMLElement;
  dataUrl?: (url: string) => any;
}

/**
 * Internal methods of favico.js library instance
 */
export interface FavicoJs {
  badge(count: number, animation?: string): void;
  badge(count: number, opts: FavicoJsOptions): void;
  reset(): void;
  image(imageElement: HTMLElement): void;
  video(imageElement: HTMLElement): void;
  webcam(): void;
}

/**
 * Interface for react component props
 * @extends FavicoJsOptions
 */
export interface FavicoProps extends FavicoJsOptions {
  counter: number;
}
