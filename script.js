document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.getElementById("main-container");
    const successContainer = document.getElementById("success-container");
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const heartsContainer = document.getElementById("hearts-container");

    let trickCount = 0;

    // A list of annoying alerts to show randomly when they try to click No
    const annoyingMessages = [
        "Hey! Are you sure?",
        "Wait, think about it!",
        "Oops! Slipped!",
        "Too slow! 😜",
        "Come on Swati, be nice!",
        "Error 404: 'No' not found."
    ];

    // Function to calculate safe random position within viewport
    function moveNoButton() {
        const bodyWidth = window.innerWidth;
        const bodyHeight = window.innerHeight;
        
        const btnWidth = btnNo.offsetWidth;
        const btnHeight = btnNo.offsetHeight;

        // Keep it safely within the screen bounds
        const safeMargin = 20;
        const randomX = Math.floor(Math.random() * (bodyWidth - btnWidth - safeMargin * 2)) + safeMargin;
        const randomY = Math.floor(Math.random() * (bodyHeight - btnHeight - safeMargin * 2)) + safeMargin;

        // Make button fixed so it jumps across the whole screen relative to viewport
        btnNo.style.position = 'fixed';
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
        
        // Ensure its index is super high
        btnNo.style.zIndex = 9999;
    }

    function handleNoInteraction(e) {
        e.preventDefault(); // Prevent default mobile behaviors like scrolling when tapping button
        
        if (trickCount === 0) {
            // First time they try to click NO popup an alert to annoy them
            alert("Warning: Breaking my heart is not allowed!");
        } else if (trickCount % 3 === 0) {
            // Every 3rd attempt, pop an alert
            const randomMsg = annoyingMessages[Math.floor(Math.random() * annoyingMessages.length)];
            alert(randomMsg);
        }
        
        trickCount++;
        moveNoButton();
    }

    // Trigger on mouse enter (desktop) and touch start (mobile)
    btnNo.addEventListener("mouseover", handleNoInteraction);
    // Use touchstart to move it immediately before a click can register on mobile
    btnNo.addEventListener("touchstart", handleNoInteraction, { passive: false });
    // Just in case they somehow click it
    btnNo.addEventListener("click", handleNoInteraction);

    // Handle Yes click
    btnYes.addEventListener("click", () => {
        mainContainer.classList.add("hidden");
        successContainer.classList.remove("hidden");
        
        // Hide No button entirely to clean up the screen
        btnNo.style.display = 'none';

        startHeartRain();
    });

    // Create floating hearts periodically
    function startHeartRain() {
        // Create initial burst
        for(let i=0; i<15; i++) {
            createHeart();
        }

        // Continue spawning
        setInterval(createHeart, 300);
    }

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        
        // Randomize starting X position across the screen width
        heart.style.left = Math.random() * 100 + "vw";
        
        // Randomize size slightly
        const size = Math.random() * 1.5 + 1;
        heart.style.fontSize = `${size}rem`;
        
        // Randomize animation duration for variety
        const duration = Math.random() * 3 + 4; // 4 to 7 seconds
        heart.style.animationDuration = `${duration}s`;
        
        // Add tiny random delay so they don't all look identical
        heart.style.animationDelay = `${Math.random() * 0.5}s`;
        
        // Add random horizontal sway via setting margin
        heart.style.marginLeft = `${(Math.random() - 0.5) * 50}px`;

        heartsContainer.appendChild(heart);
        
        // Clean up heart after animation ends
        setTimeout(() => {
            heart.remove();
        }, duration * 1000 + 1000);
    }
});
