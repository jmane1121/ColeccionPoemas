document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('romantic-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Configuración de las animaciones
    const elements = [];
    const elementCount = 15; // Cantidad total de elementos (no muchos)
    const images = {
        heart: createHeartImage(),
        butterfly: createButterflyImage(),
        sunflower: createSunflowerImage(),
        gerbera: createGerberaImage()
    };

    // Crear imágenes para los elementos
    function createHeartImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 30;
        canvas.height = 30;
        const ctx = canvas.getContext('2d');
        
        ctx.beginPath();
        ctx.moveTo(15, 3);
        ctx.bezierCurveTo(5, 3, 0, 15, 15, 27);
        ctx.bezierCurveTo(30, 15, 25, 3, 15, 3);
        ctx.fillStyle = '#FF6B6B';
        ctx.fill();
        
        return canvas;
    }

    function createButterflyImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 30;
        const ctx = canvas.getContext('2d');
        
        // Cuerpo
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(19, 5, 2, 20);
        
        // Alas
        ctx.beginPath();
        ctx.moveTo(20, 10);
        ctx.quadraticCurveTo(5, 5, 5, 15);
        ctx.quadraticCurveTo(5, 25, 20, 20);
        ctx.fillStyle = 'rgba(255, 182, 193, 0.8)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(20, 10);
        ctx.quadraticCurveTo(35, 5, 35, 15);
        ctx.quadraticCurveTo(35, 25, 20, 20);
        ctx.fill();
        
        return canvas;
    }

    function createSunflowerImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        const ctx = canvas.getContext('2d');
        
        // Centro
        ctx.beginPath();
        ctx.arc(20, 20, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#5D4037';
        ctx.fill();
        
        // Pétalos
        ctx.fillStyle = '#FFD600';
        for (let i = 0; i < 12; i++) {
            ctx.save();
            ctx.translate(20, 20);
            ctx.rotate(i * Math.PI / 6);
            ctx.beginPath();
            ctx.ellipse(15, 0, 10, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        
        return canvas;
    }

    function createGerberaImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 35;
        canvas.height = 35;
        const ctx = canvas.getContext('2d');
        
        // Centro
        ctx.beginPath();
        ctx.arc(17.5, 17.5, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#4A148C';
        ctx.fill();
        
        // Pétalos
        const colors = ['#9C27B0', '#7B1FA2', '#6A1B9A', '#AB47BC'];
        for (let i = 0; i < 15; i++) {
            ctx.save();
            ctx.translate(17.5, 17.5);
            ctx.rotate(i * Math.PI / 7.5);
            ctx.fillStyle = colors[i % 3];
            ctx.beginPath();
            ctx.ellipse(12, 0, 8, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        
        return canvas;
    }

    // Clase para los elementos flotantes
    class FloatingElement {
        constructor() {
            this.type = ['heart', 'butterfly', 'sunflower', 'gerbera'][Math.floor(Math.random() * 4)];
            this.size = this.type === 'butterfly' ? Math.random() * 0.8 + 0.5 : Math.random() * 0.7 + 0.3;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speed = Math.random() * 0.5 + 0.2;
            this.angle = Math.random() * Math.PI * 2;
            this.waveIntensity = Math.random() * 2 + 1;
            this.waveSpeed = Math.random() * 0.02 + 0.01;
            this.rotation = 0;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }
        
        update() {
            this.y -= this.speed;
            this.x += Math.sin(this.angle) * this.waveIntensity;
            this.angle += this.waveSpeed;
            this.rotation += this.rotationSpeed;
            
            if (this.y < -50) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(this.size, this.size);
            
            switch(this.type) {
                case 'heart':
                    ctx.drawImage(images.heart, -15, -15, 30, 30);
                    break;
                case 'butterfly':
                    ctx.drawImage(images.butterfly, -20, -15, 40, 30);
                    break;
                case 'sunflower':
                    ctx.drawImage(images.sunflower, -20, -20, 40, 40);
                    break;
                case 'gerbera':
                    ctx.drawImage(images.gerbera, -17.5, -17.5, 35, 35);
                    break;
            }
            
            ctx.restore();
        }
    }

    // Crear elementos flotantes
    for (let i = 0; i < elementCount; i++) {
        setTimeout(() => {
            elements.push(new FloatingElement());
        }, i * 1000);
    }

    // Animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fondo negro semi-transparente para efecto de estela
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar y dibujar elementos
        elements.forEach(element => {
            element.update();
            element.draw();
        });
        
        requestAnimationFrame(animate);
    }

    // Manejar redimensionamiento
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();
});