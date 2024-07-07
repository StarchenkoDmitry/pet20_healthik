export interface ParseBooleanConfig {
  default?: boolean;
}

export function parseBoolean(
  str: any,
  config?: ParseBooleanConfig,
): boolean {
  if (typeof str !== 'string') {
    if (typeof config?.default !== 'undefined') {
      return config.default;
    }
    throw Error('parseBoolean: str should be a string');
  }

  const lowerStr = str.toLowerCase();

  if (lowerStr === 'true') {
    return true;
  } else if (lowerStr === 'false') {
    return false;
  } else {
    if (typeof config?.default === 'boolean') {
      return config.default;
    }
    throw Error('parseBoolean: default is undefined');
  }
}
