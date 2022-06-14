import classNames from "classnames";
import React, { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import { PieceInstance } from "./Board";

interface IProps{
    black?: boolean,
    row: number,
    col: string,
    children?: ReactNode,
    pieceInstance? : PieceInstance
    onDropPiece?: (piece: PieceInstance, row: number,
        col: string) => void,
        onSquareClick?: (row: number,
            col: string, piece?: PieceInstance) => void
}
interface ICollected{
    isDragging: boolean
}

const Square = (props: IProps) => {

    const [{isOver, canDrop}, drop] = useDrop(() => ({
      accept : ItemTypes.PIECE,  
      drop(item, monitor) {
        console.log(item);
          props.onDropPiece?.(item as PieceInstance, props.row, props.col);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()       
      }),  
      canDrop: (item, monitor) => {
        if (item) {
            let _item = item as PieceInstance;
            if (_item.player === props.pieceInstance?.player) {
                return false;
            }
        }
        return true;
      }
    }), [props.onDropPiece, props.pieceInstance])

    const onSquareClick = () => {
        props.onSquareClick?.(props.row, props.col, props.pieceInstance);
    }


    return <span ref={drop} onClick={onSquareClick} className={classNames("w-16 h-16 inline-block border text-center overflow-hidden", {
        'bg-gray-500': props.black && !isOver,
        'bg-yellow-500': isOver,
        'bg-red-600': isOver && !canDrop
    })} style={{
        verticalAlign: 'top'
    }}>{props.children}</span>
}

export default Square