const size = {
  sizeXS: '0',
  sizeSM: '600px',
  sizeMD: '960px',
  sizeLG: '1280px',
  sizeXL: '1920px',
}


export default {
  xs: `(min-width: 0)`,
  sm: `(min-width: ${size.sizeSM})`,
  md: `(min-width: ${size.sizeMD})`,
  lg: `(min-width: ${size.sizeLG})`,
  xl: `(min-width: ${size.sizeXL})`,
};