import React from "react";

const SteampunkButton = ({ onClick }) => {
    return (
        <button onClick={onClick} style={styles.button}>
            <span style={styles.text}>Give me more!</span>
            <span style={styles.gearLeft}>⚙️</span>
            <span style={styles.gearRight}>⚙️</span>
        </button>
    );
};

const styles = {
    button: {
        position: "absolute",
        top: "50%",
        left: "55%",
        transform: "translate(-50%, -50%)",
        width: "200px",
        height: "80px",
        fontSize: "24px",
        fontWeight: "bold",
        border: "4px solid #6B4F4F",
        borderRadius: "10px",
        backgroundColor: "#B8860B",
        color: "#2C1A1A",
        cursor: "pointer",
        textShadow: "2px 2px 2px #000000",
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        fontFamily: "'Cormorant Garamond', serif",
    },
    text: {
        position: "relative",
        zIndex: 2,
    },
    gearLeft: {
        position: "absolute",
        top: "50%",
        left: "1px",
        transform: "translateY(-50%) rotate(20deg)",
        fontSize: "1.5em",
    },
    gearRight: {
        position: "absolute",
        top: "50%",
        right: "1px",
        transform: "translateY(-50%) rotate(-20deg)",
        fontSize: "1.5em",
    },
    buttonHover: {
        transform: "translateY(-3px)",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
    }
};


export default SteampunkButton;
