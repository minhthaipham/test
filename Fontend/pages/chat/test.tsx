import React from "react";
import Lottie from "react-lottie";
import { GIFJSON } from "@/utils/constant";
import dynamic from "next/dynamic";
const Test: React.FC = () => {
  React.useEffect(() => {
    const loadLottie = async () => {
      const Lottie = (await import("lottie-web")).default;
      const container = document.getElementById("lottie-container");
      if (container instanceof HTMLElement) {
        const animation = Lottie.loadAnimation({
          container: container,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: GIFJSON.Welcome,
        });
      }
    };

    if (typeof window !== "undefined") {
      loadLottie();
    }
  }, []);

  return (
    <div
      id="lottie-container"
      style={{ width: "500px", height: "500px" }}
    ></div>
  );
};

export default Test;
