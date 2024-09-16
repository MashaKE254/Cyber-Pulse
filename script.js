document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const hologram = document.getElementById('hologram');
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeed = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };
    let autoRotationSpeed = { x: 0.5, y: 0.7 };

    hologram.addEventListener('mousedown', startDragging);
    hologram.addEventListener('touchstart', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    function startDragging(e) {
        isDragging = true;
        previousMousePosition = {
            x: e.clientX || e.touches[0].clientX,
            y: e.clientY || e.touches[0].clientY
        };
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        const deltaMove = {
            x: clientX - previousMousePosition.x,
            y: clientY - previousMousePosition.y
        };

        rotationSpeed.x = deltaMove.y * 0.5;
        rotationSpeed.y = deltaMove.x * 0.5;

        currentRotation.x += rotationSpeed.x;
        currentRotation.y += rotationSpeed.y;

        updateHologramRotation();

        previousMousePosition = { x: clientX, y: clientY };
    }

    function stopDragging() {
        isDragging = false;
    }

    function updateHologramRotation() {
        hologram.style.transform = `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg)`;
    }

    function autoRotate() {
        if (!isDragging) {
            currentRotation.x += autoRotationSpeed.x;
            currentRotation.y += autoRotationSpeed.y;
            updateHologramRotation();
        }
    }

    function animate() {
        autoRotate();
        requestAnimationFrame(animate);
    }

    animate();

    const brandIcons = document.querySelectorAll('.brand-icon');

    function animateBrandIcons() {
        brandIcons.forEach((icon, index) => {
            const delay = index * 0.2;
            icon.style.animation = `float 3s ease-in-out ${delay}s infinite`;
        });
    }

    function createKeyframes() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    createKeyframes();
    animateBrandIcons();

    function shuffleBrandIcons() {
        const brandContainer = document.querySelector('.brand-container');
        for (let i = brandContainer.children.length; i >= 0; i--) {
            brandContainer.appendChild(brandContainer.children[Math.random() * i | 0]);
        }
    }

    shuffleBrandIcons();
});
