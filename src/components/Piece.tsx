import classNames from "classnames";
import React, { ReactNode } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { PieceInstance } from "./Board";
import {motion, useMotionValue} from 'framer-motion'

interface IProps{
    piece: PieceInstance,
    onPieceClick? : (piece: PieceInstance) => void,
    selected?: boolean,
    turn?: number
}

interface ICollected{
    isDragging: boolean,
    canDrag: boolean
}

const Piece = (props: IProps) => {
    const dragOriginX = useMotionValue(0)
    const dragOriginY = useMotionValue(0)
    const isWhite = props.piece.player === 0;
    const [ collected, drag, ] = useDrag<PieceInstance, unknown, ICollected>(() => ({
        type: ItemTypes.PIECE,
        item: props.piece,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            canDrag: monitor.canDrag(),
            
        }),
        canDrag : (monitor) => {
            if (props.turn !== props.piece.player) {
                return false;
            }
            return true;
        },
    }), [props.piece, props.turn, props.piece.player])
    
    const onPieceClick = () => {
        props.onPieceClick?.(props.piece);
    }
    return <span onClick={onPieceClick} ref={drag} className={classNames("text-6xl", {
        'text-gray-200': isWhite,
        'text-black': !isWhite,
        'cursor-pointer': collected.canDrag,
        'hover:bg-yellow-600': props.turn === props.piece.player,
        'bg-blue-700': props.selected
    })} style={{
        textShadow: '1px 1px #838383',        
        opacity: collected.isDragging ? 0.5 : 1,
    }}
    >{props.piece.PieceType}</span>
}

export default Piece