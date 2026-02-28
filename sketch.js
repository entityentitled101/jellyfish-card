// 趋光性 - 机器水母产品卡
// 简化版本 - 直接使用 DOM 事件

let canvasSize = 500;
let currentPage = 0;
const totalPages = 4;
let pageTransition = 0;
let isTransitioning = false;
let jellyfishPulse = 0;

function setup() {
    calculateCanvasSize();
    
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('canvas-container');
    
    // 窗口大小改变
    window.addEventListener('resize', () => {
        calculateCanvasSize();
        resizeCanvas(canvasSize, canvasSize);
    });
    
    // 使用全局点击事件（不依赖 p5.js）
    setupGlobalClickHandler();
}

function setupGlobalClickHandler() {
    // 获取 canvas 容器
    const container = document.getElementById('canvas-container');
    
    // 使用原生事件监听
    container.addEventListener('click', (e) => {
        e.preventDefault();
        handlePress();
    });
    
    // iOS Safari 需要 touch 事件
    container.addEventListener('touchend', (e) => {
        e.preventDefault();
        handlePress();
    }, { passive: false });
    
    // 防止双击缩放
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

function calculateCanvasSize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    
    let availableHeight = h - 80;
    let availableWidth = w - 40;
    
    canvasSize = Math.min(availableWidth, availableHeight, 500);
    canvasSize = Math.max(canvasSize, 280);
}

function draw() {
    background(10);
    
    push();
    
    if (isTransitioning) {
        pageTransition += 0.08;
        if (pageTransition >= 1) {
            pageTransition = 0;
            isTransitioning = false;
            currentPage = (currentPage + 1) % totalPages;
            updateTextVisibility();
            updatePageIndicator();
        }
    }
    
    drawPage(currentPage);
    
    if (isTransitioning) {
        drawTransition();
    }
    
    pop();
    
    jellyfishPulse += 0.03;
}

function drawPage(page) {
    noFill();
    stroke(255, 100);
    strokeWeight(0.5);
    
    let margin = canvasSize * 0.08;
    rect(margin, margin, canvasSize - margin * 2, canvasSize - margin * 2);
    
    switch(page) {
        case 0: drawCoverDecoration(); break;
        case 1: drawOriginDecoration(); break;
        case 2: drawCareDecoration(); break;
        case 3: drawBackDecoration(); break;
    }
}

function drawCoverDecoration() {
    push();
    translate(canvasSize / 2, canvasSize * 0.72);
    
    noFill();
    stroke(255, 120);
    strokeWeight(0.5);
    
    let s = canvasSize / 500;
    scale(s);
    
    beginShape();
    vertex(-50, -30);
    bezierVertex(-50, -60, 50, -60, 50, -30);
    bezierVertex(50, 0, 30, 15, 0, 15);
    bezierVertex(-30, 15, -50, 0, -50, -30);
    endShape();
    
    stroke(255, 80);
    strokeWeight(0.3);
    
    for (let i = 0; i < 4; i++) {
        let x = -35 + i * 23;
        beginShape();
        vertex(x, 10);
        bezierVertex(x, 30, x - 5 + i * 2, 50, x - 3 + i, 70);
        endShape();
    }
    
    let pulse = sin(jellyfishPulse) * 0.3 + 0.7;
    
    stroke(255, 100 * pulse);
    strokeWeight(0.5);
    ellipse(0, -20, 8, 8);
    
    stroke(255, 60 * pulse);
    strokeWeight(0.3);
    ellipse(0, -20, 18, 18);
    
    stroke(255, 40 * pulse);
    strokeWeight(0.2);
    ellipse(0, -20, 30, 30);
    
    pop();
}

function drawOriginDecoration() {
    push();
    let s = canvasSize / 500;
    translate(canvasSize * 0.75, canvasSize * 0.82);
    scale(s * 0.7);
    
    noFill();
    stroke(255, 60);
    strokeWeight(0.4);
    
    for (let i = 0; i < 4; i++) {
        push();
        translate((i - 1.5) * 25, 0);
        ellipse(0, 15, 18, 10);
        
        stroke(255, 40);
        strokeWeight(0.3);
        let legCurve = sin(jellyfishPulse + i) * 5;
        beginShape();
        vertex(0, 10);
        vertex(legCurve, -5);
        vertex(legCurve * 0.5, -20);
        endShape();
        pop();
    }
    pop();
}

function drawCareDecoration() {
    push();
    let s = canvasSize / 500;
    translate(canvasSize * 0.78, canvasSize * 0.18);
    scale(s * 0.6);
    
    noFill();
    
    let x1 = -40, y1 = 0;
    let x2 = 40, y2 = 0;
    
    let pulse1 = sin(jellyfishPulse) * 0.4 + 0.6;
    let pulse2 = sin(jellyfishPulse + PI) * 0.4 + 0.6;
    
    stroke(255, 100 * pulse1);
    strokeWeight(0.5);
    ellipse(x1, y1, 10, 10);
    stroke(255, 50 * pulse1);
    strokeWeight(0.3);
    ellipse(x1, y1, 22, 22);
    
    stroke(255, 100 * pulse2);
    strokeWeight(0.5);
    ellipse(x2, y2, 10, 10);
    stroke(255, 50 * pulse2);
    strokeWeight(0.3);
    ellipse(x2, y2, 22, 22);
    
    stroke(255, 40);
    strokeWeight(0.3);
    
    drawingContext.setLineDash([4, 3]);
    beginShape();
    for (let a = 0; a <= PI; a += 0.1) {
        let x = map(a, 0, PI, x1 + 8, x2 - 8);
        let y = -sin(a) * 15;
        vertex(x, y);
    }
    endShape();
    
    beginShape();
    for (let a = 0; a <= PI; a += 0.1) {
        let x = map(a, 0, PI, x1 + 8, x2 - 8);
        let y = sin(a) * 12;
        vertex(x, y);
    }
    endShape();
    
    drawingContext.setLineDash([]);
    pop();
}

function drawBackDecoration() {
    push();
    let s = canvasSize / 500;
    translate(canvasSize / 2, canvasSize * 0.72);
    scale(s);
    
    noFill();
    
    let pulse = sin(jellyfishPulse * 0.8) * 0.3 + 0.7;
    
    stroke(255, 100 * pulse);
    strokeWeight(0.5);
    ellipse(0, 0, 6, 6);
    
    stroke(255, 50 * pulse);
    strokeWeight(0.3);
    ellipse(0, 0, 20, 20);
    
    stroke(255, 35 * pulse);
    strokeWeight(0.2);
    ellipse(0, 0, 38, 38);
    
    stroke(255, 20 * pulse);
    strokeWeight(0.15);
    ellipse(0, 0, 60, 60);
    
    stroke(255, 30 * pulse);
    strokeWeight(0.15);
    
    for (let i = 0; i < 8; i++) {
        let angle = (TWO_PI / 8) * i + jellyfishPulse * 0.1;
        let r1 = 35;
        let r2 = 55;
        line(cos(angle) * r1, sin(angle) * r1, cos(angle) * r2, sin(angle) * r2);
    }
    pop();
}

function drawTransition() {
    push();
    let fadeAlpha = map(pageTransition, 0, 0.5, 255, 0);
    if (pageTransition > 0.5) {
        fadeAlpha = map(pageTransition, 0.5, 1, 0, 255);
    }
    
    noStroke();
    fill(10, fadeAlpha * 0.3);
    rect(0, 0, canvasSize, canvasSize);
    pop();
}

function handlePress() {
    if (!isTransitioning) {
        isTransitioning = true;
        pageTransition = 0;
    }
}

function updateTextVisibility() {
    for (let i = 0; i < totalPages; i++) {
        const pageEl = document.getElementById(`page-${i}`);
        if (pageEl) {
            if (i === currentPage) {
                pageEl.style.display = 'block';
                pageEl.style.opacity = '0';
                setTimeout(() => {
                    pageEl.style.transition = 'opacity 0.4s ease';
                    pageEl.style.opacity = '1';
                }, 50);
            } else {
                pageEl.style.display = 'none';
            }
        }
    }
}

function updatePageIndicator() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
}

// 禁用 p5.js 默认鼠标/触摸事件
function mousePressed() { return false; }
function touchStarted() { return false; }

// 键盘支持
function keyPressed() {
    if (key === ' ' || key === 'Enter' || keyCode === RIGHT_ARROW) {
        handlePress();
    } else if (keyCode === LEFT_ARROW) {
        if (!isTransitioning) {
            currentPage = (currentPage - 1 + totalPages) % totalPages;
            updateTextVisibility();
            updatePageIndicator();
        }
    }
}
