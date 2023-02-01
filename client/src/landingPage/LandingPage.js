import React from 'react'
import '../landingPage/LandingPage.css'
import { useState, useEffect } from 'react'
export default function LandingPage() {
    const animate = (ct, y, c, w, h) => {
        const dy = 1;
        requestAnimationFrame(animate);
        ct.clearRect(0, 0, w, h)
        y -= dy
    }
    
    const controlCanvas = () => {
        animate(ctx, y, canva, canva.width, canva.height);
        const canva = document.querySelector("#canva");
        canva.width = window.innerWidth;
        canva.height = "500"
        var x = 170;
        var y = 140
        const heig = 178;
        const wid = 178;
        var ctx = canva.getContext("2d");
        ctx.fillStyle = "red"
        ctx.beginPath();
        ctx.fillRect(x, y, heig, wid);
        ctx.fill();
    }

    useEffect(() => { controlCanvas() })

    return (
        <div className='landingPage'>
            <div>
                <canvas id="canva"> </canvas>
            </div>
        </div>
    )
}
