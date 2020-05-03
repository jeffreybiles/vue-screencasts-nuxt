export default function({ app }) {
  if (window && (window.Cypress || window.cy)) {
    window.app = app;
  }
}
