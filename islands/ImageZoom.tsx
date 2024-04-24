import Image from "apps/website/components/Image.tsx";
import { useState } from "preact/hooks";

interface Props {
    src: string;
}

export default function ImageZoom({src}: Props) {
    const [position, setPosition] = useState({ x: '0%', y: '0%' });

    // deno-lint-ignore no-explicit-any
    const handleMouseMove = (e: any) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = `${(e.pageX - left) / width * 160}%`;
        const y = `${(e.pageY - top) / height * 160}%`;
        setPosition({x, y})
        console.log(position)
    }
    return (
        <figure class="max-w-lg zoomImage group"  onMouseMove={handleMouseMove} style={{
            backgroundPosition: `${position.x} ${position.y}`,
            backgroundImage: `url(${src})`
        }}>
            <Image 
                class="group-hover:opacity-0" 
                src={src}
                width={1000}
                height={1000}
            />
        </figure>
    )
}