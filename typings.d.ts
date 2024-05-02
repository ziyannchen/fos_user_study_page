declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.jpg';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;

  const url: string;
  export default url;
}
declare module '*.css' {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
}

declare module '*.sass' {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
}

declare module '*.scss' {
  const classes: {
    readonly [key: string]: string;
  };
  export default classes;
}

declare const __bl: {
  /**
   * @param key 事件名
   * @param v 单词累加上报次数
   */
  sum: (key: string, v?: number) => void;
  setConfig: (data: any) => void;
};
declare const routerBase: string;
declare const publicPath: string;
declare const env: string;

declare module 'animejs';
declare module 'use-animate-number';
