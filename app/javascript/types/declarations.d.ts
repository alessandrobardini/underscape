declare module '*.png' {
   const value: any
   export = value;
}

declare module '*.svg' {
   import * as React from 'react'
 
   export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
 
   const src: string
   export default src
 }
