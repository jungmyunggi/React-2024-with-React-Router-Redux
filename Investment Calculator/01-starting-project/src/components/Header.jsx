import logo from "../assets/investment-calculator-logo.png";

export default function Header() {
  return (
    <header id="header">
      <img src={logo} alt="돈가방이 보이는 사진" />
      <h1>Investment Calculator</h1>
    </header>
  );
}
