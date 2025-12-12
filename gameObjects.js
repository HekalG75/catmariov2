// gameObjects.js
// Kelas-kelas untuk objek game

class GameObject {
    constructor(x, y, width, height, imagePath = null, color = '#646464') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imagePath = imagePath;
        this.color = color;
        this.image = null;

        if (imagePath) {
            this.image = new Image();
            this.image.src = imagePath;
        }
    }

    draw(ctx, cameraX) {
        const drawX = this.x - cameraX;

        if (this.image && this.image.complete) {
            ctx.drawImage(this.image, drawX, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(drawX, this.y, this.width, this.height);
        }
    }
}

class Platform extends GameObject {
    constructor(x, y, width, height, imagePath = null) {
        super(x, y, width, height, imagePath, '#8B4513');
        this.type = 'platform';
    }
}

class Enemy extends GameObject {
    constructor(x, y, width, height, imagePath = null, moveRange = 100, speed = 2) {
        super(x, y, width, height, imagePath, '#FF6464');
        this.type = 'enemy';
        this.startX = x;
        this.moveRange = moveRange;
        this.speed = speed;
        this.direction = 1;
    }

    update() {
        this.x += this.speed * this.direction;

        if (Math.abs(this.x - this.startX) >= this.moveRange) {
            this.direction *= -1;
        }
    }
}

class Item extends GameObject {
    constructor(x, y, width, height, imagePath = null, itemType = 'coin') {
        super(x, y, width, height, imagePath, '#FFD700');
        this.type = 'item';
        this.itemType = itemType;
        this.collected = false;
        this.activated = false;
    }

    collect() {
        this.collected = true;
    }

    activate() {
        if (!this.activated) {
            this.activated = true;
            return true;
        }
        return false;
    }
}

class Decoration extends GameObject {
    constructor(x, y, width, height, imagePath = null) {
        super(x, y, width, height, imagePath, '#64C864');
        this.type = 'decoration';
    }
}

class TrapPlatform extends Platform {
    constructor(x, y, width, height, imagePath = null) {
        super(x, y, width, height, imagePath);
        this.type = 'trap_platform';
        this.activated = false;
        this.fallSpeed = 0;
        this.originalY = y;
    }

    activate() {
        this.activated = true;
    }

    update() {
        if (this.activated) {
            this.fallSpeed += 0.5;
            this.y += this.fallSpeed;
        }
    }
}

class InvisibleBlock extends Platform {
    constructor(x, y, width, height, imagePath = null) {
        super(x, y, width, height, imagePath);
        this.type = 'invisible_block';
        this.visible = false;
        this.originalColor = this.color;
        this.color = '#87CEEB'; // Warna langit
    }

    reveal() {
        this.visible = true;
        this.color = this.originalColor;
    }

    draw(ctx, cameraX) {
        if (this.visible) {
            super.draw(ctx, cameraX);
        }
    }
}
