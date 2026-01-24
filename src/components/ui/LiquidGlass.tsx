"use client";

import { useEffect, useRef, useState } from "react";

interface LiquidGlassProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
    borderRadius?: number;
    bezelWidth?: number;
    refractionStrength?: number;
    specularOpacity?: number;
    isDark?: boolean;
}

// Generate displacement map for rounded rectangle refraction
function generateDisplacementMap(
    width: number,
    height: number,
    borderRadius: number,
    bezelWidth: number,
    maxDisplacement: number
): string {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    // Fill with neutral displacement (128, 128) = no displacement
    ctx.fillStyle = "rgb(128, 128, 128)";
    ctx.fillRect(0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Calculate displacement for each pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;

            // Calculate distance from edges
            const distLeft = x;
            const distRight = width - x;
            const distTop = y;
            const distBottom = height - y;

            // Find which edge/corner is closest
            let dx = 0;
            let dy = 0;

            // Calculate distance from the rounded rectangle border
            const cornerRadius = borderRadius;

            // Check if in corner regions
            const inTopLeft = x < cornerRadius && y < cornerRadius;
            const inTopRight = x > width - cornerRadius && y < cornerRadius;
            const inBottomLeft = x < cornerRadius && y > height - cornerRadius;
            const inBottomRight = x > width - cornerRadius && y > height - cornerRadius;

            let distFromBorder = Infinity;
            let normalX = 0;
            let normalY = 0;

            if (inTopLeft) {
                // Top-left corner
                const cx = cornerRadius;
                const cy = cornerRadius;
                const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
                distFromBorder = cornerRadius - dist;
                if (dist > 0) {
                    normalX = (x - cx) / dist;
                    normalY = (y - cy) / dist;
                }
            } else if (inTopRight) {
                // Top-right corner
                const cx = width - cornerRadius;
                const cy = cornerRadius;
                const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
                distFromBorder = cornerRadius - dist;
                if (dist > 0) {
                    normalX = (x - cx) / dist;
                    normalY = (y - cy) / dist;
                }
            } else if (inBottomLeft) {
                // Bottom-left corner
                const cx = cornerRadius;
                const cy = height - cornerRadius;
                const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
                distFromBorder = cornerRadius - dist;
                if (dist > 0) {
                    normalX = (x - cx) / dist;
                    normalY = (y - cy) / dist;
                }
            } else if (inBottomRight) {
                // Bottom-right corner
                const cx = width - cornerRadius;
                const cy = height - cornerRadius;
                const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
                distFromBorder = cornerRadius - dist;
                if (dist > 0) {
                    normalX = (x - cx) / dist;
                    normalY = (y - cy) / dist;
                }
            } else {
                // On edges (not corners)
                if (distLeft < distRight && distLeft < distTop && distLeft < distBottom) {
                    distFromBorder = distLeft;
                    normalX = -1;
                    normalY = 0;
                } else if (distRight < distTop && distRight < distBottom) {
                    distFromBorder = distRight;
                    normalX = 1;
                    normalY = 0;
                } else if (distTop < distBottom) {
                    distFromBorder = distTop;
                    normalX = 0;
                    normalY = -1;
                } else {
                    distFromBorder = distBottom;
                    normalX = 0;
                    normalY = 1;
                }
            }

            // Only apply displacement within the bezel width
            if (distFromBorder >= 0 && distFromBorder < bezelWidth) {
                // Convex surface function (like Apple's Liquid Glass)
                // Using cosine for smooth falloff
                const t = distFromBorder / bezelWidth;
                const surfaceHeight = Math.cos(t * Math.PI * 0.5);

                // Calculate refraction displacement magnitude
                // Snell's law approximation for glass (n ≈ 1.5)
                const refractionIndex = 1.5;
                const incidentAngle = Math.atan(surfaceHeight * 2); // Derivative approximation
                const refractionFactor = Math.sin(incidentAngle) / refractionIndex;

                const magnitude = refractionFactor * maxDisplacement * (1 - t);

                dx = normalX * magnitude;
                dy = normalY * magnitude;
            }

            // Convert displacement to color values
            // 128 = no displacement, 0 = -maxDisplacement, 255 = +maxDisplacement
            const r = Math.round(128 + (dx / maxDisplacement) * 127);
            const g = Math.round(128 + (dy / maxDisplacement) * 127);

            data[idx] = Math.max(0, Math.min(255, r));     // R
            data[idx + 1] = Math.max(0, Math.min(255, g)); // G
            data[idx + 2] = 128;                           // B (unused)
            data[idx + 3] = 255;                           // A
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

// Generate specular highlight for the glass edges
function generateSpecularHighlight(
    width: number,
    height: number,
    borderRadius: number,
    bezelWidth: number,
    opacity: number,
    isDark: boolean
): string {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    // Create gradient for top-left light source
    const gradient = ctx.createLinearGradient(0, 0, width, height);

    if (isDark) {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${opacity * 0.3})`);
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    } else {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${opacity * 0.4})`);
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    }

    // Draw rounded rectangle with specular
    ctx.beginPath();
    ctx.roundRect(0, 0, width, height, borderRadius);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add rim light on top edge
    const rimGradient = ctx.createLinearGradient(width * 0.1, 0, width * 0.9, 0);
    rimGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    rimGradient.addColorStop(0.2, `rgba(255, 255, 255, ${isDark ? 0.4 : 0.6})`);
    rimGradient.addColorStop(0.5, `rgba(255, 255, 255, ${isDark ? 0.6 : 0.8})`);
    rimGradient.addColorStop(0.8, `rgba(255, 255, 255, ${isDark ? 0.4 : 0.6})`);
    rimGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = rimGradient;
    ctx.fillRect(width * 0.1, 0, width * 0.8, 2);

    return canvas.toDataURL();
}

export function LiquidGlass({
    children,
    className = "",
    style = {},
    width = 849,
    height = 68,
    borderRadius = 16,
    bezelWidth = 20,
    refractionStrength = 1.0,
    specularOpacity = 0.4,
    isDark = false,
}: LiquidGlassProps) {
    const [displacementMap, setDisplacementMap] = useState<string>("");
    const [specularMap, setSpecularMap] = useState<string>("");
    const [isChrome, setIsChrome] = useState(false);
    const filterId = useRef(`liquid-glass-${Math.random().toString(36).substr(2, 9)}`);
    const maxDisplacement = 15 * refractionStrength;

    useEffect(() => {
        // Check if Chrome (supports SVG filters as backdrop-filter)
        const isChromeBrowser = /Chrome/.test(navigator.userAgent) && !/Edge|Edg/.test(navigator.userAgent);
        setIsChrome(isChromeBrowser);

        if (isChromeBrowser) {
            // Generate displacement and specular maps
            const dispMap = generateDisplacementMap(width, height, borderRadius, bezelWidth, maxDisplacement);
            const specMap = generateSpecularHighlight(width, height, borderRadius, bezelWidth, specularOpacity, isDark);

            setDisplacementMap(dispMap);
            setSpecularMap(specMap);
        }
    }, [width, height, borderRadius, bezelWidth, maxDisplacement, specularOpacity, isDark]);

    // Fallback styles for non-Chrome browsers
    const fallbackStyles: React.CSSProperties = {
        background: isDark ? "rgba(30, 30, 30, 0.45)" : "rgba(245, 245, 245, 0.4)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: isDark
            ? "0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            : "0 4px 30px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    };

    // Chrome-specific Liquid Glass styles
    const chromeStyles: React.CSSProperties = isChrome && displacementMap ? {
        backdropFilter: `url(#${filterId.current})`,
        WebkitBackdropFilter: `url(#${filterId.current})`,
        background: isDark ? "rgba(30, 30, 30, 0.25)" : "rgba(255, 255, 255, 0.15)",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: isDark
            ? "0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
            : "0 4px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    } : fallbackStyles;

    return (
        <>
            {/* SVG Filter Definition (only rendered for Chrome) */}
            {isChrome && displacementMap && (
                <svg
                    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
                    aria-hidden="true"
                >
                    <defs>
                        <filter
                            id={filterId.current}
                            x="-10%"
                            y="-10%"
                            width="120%"
                            height="120%"
                            filterUnits="objectBoundingBox"
                            colorInterpolationFilters="sRGB"
                        >
                            {/* Load displacement map */}
                            <feImage
                                href={displacementMap}
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                result="dispMap"
                                preserveAspectRatio="none"
                            />

                            {/* Red channel - displaced slightly more */}
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="dispMap"
                                scale={maxDisplacement * 1.15}
                                xChannelSelector="R"
                                yChannelSelector="G"
                                result="displaced_r"
                            />
                            <feColorMatrix
                                in="displaced_r"
                                type="matrix"
                                values="1 0 0 0 0
                                        0 0 0 0 0
                                        0 0 0 0 0
                                        0 0 0 1 0"
                                result="red"
                            />

                            {/* Green channel - base displacement */}
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="dispMap"
                                scale={maxDisplacement}
                                xChannelSelector="R"
                                yChannelSelector="G"
                                result="displaced_g"
                            />
                            <feColorMatrix
                                in="displaced_g"
                                type="matrix"
                                values="0 0 0 0 0
                                        0 1 0 0 0
                                        0 0 0 0 0
                                        0 0 0 1 0"
                                result="green"
                            />

                            {/* Blue channel - displaced slightly less */}
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="dispMap"
                                scale={maxDisplacement * 0.85}
                                xChannelSelector="R"
                                yChannelSelector="G"
                                result="displaced_b"
                            />
                            <feColorMatrix
                                in="displaced_b"
                                type="matrix"
                                values="0 0 0 0 0
                                        0 0 0 0 0
                                        0 0 1 0 0
                                        0 0 0 1 0"
                                result="blue"
                            />

                            {/* Combine RGB channels for chromatic aberration */}
                            <feBlend in="red" in2="green" mode="screen" result="rg" />
                            <feBlend in="rg" in2="blue" mode="screen" result="chromatic" />

                            {/* Add subtle blur for frosted effect - reduced */}
                            <feGaussianBlur
                                in="chromatic"
                                stdDeviation="2"
                                result="blurred"
                            />

                            {/* Boost saturation to enhance colors */}
                            <feColorMatrix
                                in="blurred"
                                type="saturate"
                                values="1.4"
                                result="saturated"
                            />

                            {/* Load specular highlight */}
                            <feImage
                                href={specularMap}
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                result="specular"
                                preserveAspectRatio="none"
                            />

                            {/* Blend specular on top */}
                            <feBlend
                                in="saturated"
                                in2="specular"
                                mode="screen"
                                result="final"
                            />
                        </filter>
                    </defs>
                </svg>
            )}

            {/* Main container */}
            <div
                className={`liquid-glass-container ${className}`}
                style={{
                    position: "relative",
                    borderRadius,
                    overflow: "visible",
                    isolation: "isolate",
                    ...chromeStyles,
                    ...style,
                }}
            >
                {/* Specular overlay for Chrome */}
                {isChrome && specularMap && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "inherit",
                            pointerEvents: "none",
                            backgroundImage: `url(${specularMap})`,
                            backgroundSize: "100% 100%",
                            opacity: 0.3,
                            mixBlendMode: "overlay",
                            zIndex: 1,
                        }}
                    />
                )}

                {/* Content */}
                <div style={{ position: "relative", zIndex: 2 }}>
                    {children}
                </div>
            </div>
        </>
    );
}
