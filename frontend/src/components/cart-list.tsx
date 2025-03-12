// app/cart/CartList.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { api } from "../server/service";
// frontend\src\server\service.ts
interface CustomUser {
  id: string | number;
  email: string;
  role: string;
  phone: string;
  name: string;
  address: string;
}

interface Session {
  access_token?: string;
  user: CustomUser;
}

interface CartListProps {
  session: Session | null;
}

export default function CartList({ session }: CartListProps) {
  const { globalCart, carts, removeFromCart, addToCart } = useCart();
  const router = useRouter();
  const [comments, setComments] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const total = globalCart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const restaurantId = Object.keys(carts)[0] || "1";

  const handleSubmitOrder = async () => {
    if (!session?.user) {
      alert("Por favor, inicia sesión para realizar un pedido.");
      router.push("/login");
      return;
    }

    if (paymentMethod === "card") {
      setShowPaymentPopup(true);
    } else {
      await submitOrder();
    }
  };

  const submitOrder = async () => {
    setIsSubmitting(true);
    const orderRequest = {
      restaurantId: parseInt(restaurantId),
      clientId: session!.user.id,
      total,
      comments,
      details: globalCart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        subtotal: item.quantity * item.price,
      })),
    };

    try {
      console.log("Enviando pedido:", orderRequest);
      console.log("Token:", session!.access_token);
      const response = await api.order.create(orderRequest, session!.access_token || "");
      setShowPaymentPopup(false);
      setShowThankYouPopup(true);
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      if (error instanceof Error) {
        alert(`Hubo un error al procesar tu pedido: ${error.message}. Intenta de nuevo.`);
      } else {
        alert("Hubo un error al procesar tu pedido. Intenta de nuevo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardDetails.number && cardDetails.expiry && cardDetails.cvv) {
      submitOrder();
    } else {
      alert("Por favor, completa todos los campos de la tarjeta.");
    }
  };

  const handleCloseThankYou = () => {
    setShowThankYouPopup(false);
    setCardDetails({ number: "", expiry: "", cvv: "" });
    router.push("/");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-cream rounded-lg shadow-lg min-h-screen">
      <h2 className="text-4xl text-orange-900 font-lobster text-center mb-6">Tu Carrito</h2>

      {globalCart.length > 0 ? (
        <div className="space-y-4">
          {globalCart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm border border-orange-200"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-900">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeFromCart(restaurantId, item.id)}
                  className="px-2 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() =>
                    addToCart(restaurantId, {
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: 1
                    })
                  }
                  className="px-2 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-orange-100 rounded-md">
            <p className="text-lg font-semibold text-orange-900">
              Total: <span className="text-2xl">${total.toFixed(2)}</span>
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="comments" className="block text-lg font-semibold text-orange-900 mb-2">
              Comentarios al pedido
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-3 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
              placeholder="Ej: Sin cebolla, por favor."
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">Método de pago</h3>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="text-gray-700">Tarjeta</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span className="text-gray-700">Efectivo</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || globalCart.length === 0}
            className={`mt-6 w-full py-3 text-white font-semibold rounded-md ${
              isSubmitting || globalCart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
          </button>
        </div>
      ) : (
        <p className="text-center text-orange-900 text-lg">Tu carrito está vacío</p>
      )}

      {/* Popup de pago con tarjeta */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-cream p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl text-orange-900 font-lobster mb-4 text-center">Pago con Tarjeta</h3>
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <label className="block text-orange-900 font-semibold mb-1">Número de tarjeta</label>
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                />
              </div>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-orange-900 font-semibold mb-1">Fecha de vencimiento</label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-orange-900 font-semibold mb-1">CVV</label>
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Pagar
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentPopup(false)}
                  className="w-full py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup de agradecimiento */}
      {showThankYouPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-cream p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h3 className="text-2xl text-orange-900 font-lobster mb-4">¡Gracias por tu pedido!</h3>
            <p className="text-orange-900 mb-4">
              Tu pedido ha sido procesado con éxito. Pronto lo recibirás.
            </p>
            <button
              onClick={handleCloseThankYou}
              className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}