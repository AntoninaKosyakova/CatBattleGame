const slider = document.getElementById("durationSlider");
const valueDisplay = document.getElementById("sliderValue");

slider.oninput = function () {
    valueDisplay.textContent = `${this.value} minute${this.value > 1 ? "s" : ""}`;
};

function startGame() {
    const duration = slider.value;
    alert(`Game will last for ${duration} minute${duration > 1 ? "s" : ""}.`);

    // Redirect to gameplay.html
    window.location.href = "../pages/gameplay.html";
}
