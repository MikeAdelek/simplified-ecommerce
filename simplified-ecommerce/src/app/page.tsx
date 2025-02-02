import ClientWrapper from "@/Components/ClientWrapper";
import EcommerceApp from "@/Components/EcommerceApp";
import { CartProvider } from "@/store/CartContext";

export default function Home() {
  return (
    <ClientWrapper>
      <CartProvider>
        <EcommerceApp />
      </CartProvider>
    </ClientWrapper>
  );
}
