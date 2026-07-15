import {Fragment, jsx} from 'react/jsx-runtime';
import type {ReactElement} from 'react';

export {Fragment};

export function jsxDEV(
  type: any,
  props: Record<string, unknown> | null,
  key?: string,
): ReactElement {
  return jsx(type, props ?? {}, key);
}
