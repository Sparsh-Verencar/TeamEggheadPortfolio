import { Egg } from 'lucide-react'
import { CommandMenu } from './CommandMenu'
import { motion } from "framer-motion"
import ShapeBlur from './react_bits/Animations/ShapeBlur/ShapeBlur'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const WindowTaskBar = () => {
    return (
        <div className="absolute w-screen h-[9vh] left-0 top-[91vh] flex items-center justify-center bg-white/10 backdrop-blur-md text-white border-t border-white/20 shadow-md gap-4">
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="relative w-[50px] h-[50px]" onClick={() => { window.close() }}>
                        <ShapeBlur
                            variation={0}
                            shapeSize={1.7}
                            roundness={0.3}
                            borderSize={0.05}
                            circleSize={0.9}
                            circleEdge={0.9}
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Egg className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Wanna Leave? Click here</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default WindowTaskBar
