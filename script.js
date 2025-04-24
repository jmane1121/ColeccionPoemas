document.addEventListener('DOMContentLoaded', function() {
    // Configuración del canvas para los corazones
    const canvas = document.getElementById('hearts-canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar el tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Array para almacenar los corazones
    let hearts = [];
    
    // Clase Corazón
    class Heart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 15 + 5;
            this.speedY = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            //this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
            this.color = `hsl(${Math.random() * 30 + 350}, 70%, 60%)`;
            this.opacity = 1;
            this.life = 100;
        }
        
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.life--;
            this.opacity = this.life / 100;
            
            // Rotación suave
            this.angle += 0.01;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Dibujar corazón
            ctx.beginPath();
            ctx.moveTo(0, 0 - this.size/4);
            ctx.bezierCurveTo(
                0 - this.size/2, 0 - this.size/2,
                0 - this.size, 0 + this.size/3,
                0, 0 + this.size
            );
            ctx.bezierCurveTo(
                0 + this.size, 0 + this.size/3,
                0 + this.size/2, 0 - this.size/2,
                0, 0 - this.size/4
            );
            ctx.closePath();
            
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowColor = this.color;
ctx.shadowBlur = 10;
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    // Función para crear corazones
    function createHearts(x, y, count) {
        for (let i = 0; i < count; i++) {
            hearts.push(new Heart(x, y));
        }
    }
    
    // Animación de corazones
    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar y dibujar corazones
        for (let i = 0; i < hearts.length; i++) {
            hearts[i].update();
            hearts[i].draw();
            
            // Eliminar corazones que ya no son visibles
            if (hearts[i].life <= 0 || hearts[i].y < 0) {
                hearts.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animateHearts);
    }
    
    // Iniciar animación
    animateHearts();
    
    // Función para abrir poema y lanzar corazones
    window.openPoem = function(card) {
        // Alternar clase para la animación
        card.classList.toggle('opened');
        
        // Obtener posición de la tarjeta
        const rect = card.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Crear corazones
        createHearts(x, y, 15);
    };
    
    // Redimensionar canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});