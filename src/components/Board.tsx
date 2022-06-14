import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import Piece from "./Piece";
import Square from "./Square";

interface IProps{
}

const COLS = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h'];
const ROWS = [8,7,6,5,4,3,2,1];

const PieceType = {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
}

export interface PieceInstance{
    PieceType: string,
    col: string,
    row: number,
    player: number
}



const Board = (props: IProps) => {
    const [pieces, setpieces] = useState<Array<PieceInstance>>([
        { player: 0, row: 1, col: 'a', PieceType: PieceType.rook} as PieceInstance,
        { player: 0, row: 1, col: 'b', PieceType: PieceType.knight,} as PieceInstance,
        { player: 0, row: 1, col: 'c', PieceType: PieceType.bishop} as PieceInstance,
        { player: 0, row: 1, col: 'd', PieceType: PieceType.king} as PieceInstance,
        { player: 0, row: 1, col: 'e', PieceType: PieceType.queen} as PieceInstance,
        { player: 0, row: 1, col: 'f', PieceType: PieceType.bishop} as PieceInstance,
        { player: 0, row: 1, col: 'g', PieceType: PieceType.knight} as PieceInstance,
        { player: 0, row: 1, col: 'h', PieceType: PieceType.rook} as PieceInstance,
        
        { player: 0, row: 2, col: 'a', PieceType: PieceType.pawn} as PieceInstance,
        { player: 0, row: 2, col: 'b', PieceType: PieceType.pawn,} as PieceInstance,
        { player: 0, row: 2, col: 'c', PieceType: PieceType.pawn} as PieceInstance,
        { player: 0, row: 2, col: 'd', PieceType: PieceType.pawn} as PieceInstance,
        { player: 0, row: 2, col: 'e', PieceType: PieceType.pawn} as PieceInstance,
        { player: 0, row: 2, col: 'f', PieceType: PieceType.pawn} as PieceInstance,
        { player: 0, row: 2, col: 'g', PieceType: PieceType.pawn} as PieceInstance,
        { player: 0, row: 2, col: 'h', PieceType: PieceType.pawn} as PieceInstance,

        
        { player: 1, row: 8, col: 'a', PieceType: PieceType.rook} as PieceInstance,
        { player: 1, row: 8, col: 'b', PieceType: PieceType.knight,} as PieceInstance,
        { player: 1, row: 8, col: 'c', PieceType: PieceType.bishop} as PieceInstance,
        { player: 1, row: 8, col: 'd', PieceType: PieceType.king} as PieceInstance,
        { player: 1, row: 8, col: 'e', PieceType: PieceType.queen} as PieceInstance,
        { player: 1, row: 8, col: 'f', PieceType: PieceType.bishop} as PieceInstance,
        { player: 1, row: 8, col: 'g', PieceType: PieceType.knight} as PieceInstance,
        { player: 1, row: 8, col: 'h', PieceType: PieceType.rook} as PieceInstance,
        
        { player: 1, row: 7, col: 'a', PieceType: PieceType.pawn} as PieceInstance,
        { player: 1, row: 7, col: 'b', PieceType: PieceType.pawn,} as PieceInstance,
        { player: 1, row: 7, col: 'c', PieceType: PieceType.pawn} as PieceInstance,
        { player: 1, row: 7, col: 'd', PieceType: PieceType.pawn} as PieceInstance,
        { player: 1, row: 7, col: 'e', PieceType: PieceType.pawn} as PieceInstance,
        { player: 1, row: 7, col: 'f', PieceType: PieceType.pawn} as PieceInstance,
        { player: 1, row: 7, col: 'g', PieceType: PieceType.pawn} as PieceInstance,
        { player: 1, row: 7, col: 'h', PieceType: PieceType.pawn} as PieceInstance,
    ]);

    
    const [deadPieces, setDeadPieces] = useState<Array<PieceInstance>>([]);

    
    const [selectedPiece, setSelectedPiece] = useState<PieceInstance | null>(null);

    const [turn, setTurn] = useState(0);
    const [logs, setLogs] = useState<Array<string>>([]);

    const onDropPiece = (piece: PieceInstance, row: number,
        col: string) => {
            
            let existPlayerPiece = pieces.find(p=> p.col === col 
                && p.row === row && p.player === piece.player);
                if (existPlayerPiece) {
                    window.alert("Invaild movement");
                    return;
                }

            let otherPieces = pieces.filter(p=> !(p.col === piece.col 
                && p.row === piece.row 
                && p.PieceType === piece.PieceType 
                && p.player === piece.player));
            let _logs = [];
            _logs.push(`Player ${turn}: ${piece.PieceType} ${piece.col}${piece.row} => ${col}${row}`);
            let existThatPlayerPiece = pieces.find(p=> p.col === col 
                && p.row === row && p.player !== piece.player);
                if (existThatPlayerPiece) {
                    if (! window.confirm("Take?")) {
                        return;
                    }
                    otherPieces = otherPieces.filter(p => !(p.col === col 
                        && p.row === row && p.player !== piece.player));
                    setDeadPieces([...deadPieces, existThatPlayerPiece]);

                    _logs.push(`Player ${turn}: [[[[]]]] ${piece.PieceType} x ${existThatPlayerPiece.PieceType}`);
                }

            setpieces([...otherPieces, {
                ...piece,
                col: col,
                row: row
            }])
            setTurn(t=> t ^ 1);
            setLogs([...logs, ..._logs]);
    }

    const onPieceClick = (piece: PieceInstance) => {
        setSelectedPiece({
            ...piece
        } as PieceInstance);
    }
    
    const onSquareClick = (row: number, col: string, piece?: PieceInstance) => {
        console.log('onSquareClick');
        if (selectedPiece && selectedPiece.player === turn) {
            if (!piece) { // move
                onDropPiece(selectedPiece, row, col);
            }
            else if(piece.player !== selectedPiece.player){ // exist and attack
                onDropPiece(selectedPiece, row, col);
                setSelectedPiece(null);                
            }            
        }
        
    }

    const getSquares = () => {

        let squares = [];
        for (let index = 0; index < ROWS.length; index++) {
            const row = ROWS[index];
            let rows = [];
            for (let indexCol = 0; indexCol < COLS.length; indexCol++) {
                const col = COLS[indexCol];
                let black = (indexCol % 2 === 1 && row % 2 === 1) || (indexCol % 2 === 0 && row % 2 === 0);
                let piece =  pieces.find(p=> p.col=== col && p.row === row);
                let cell = <Square onSquareClick={onSquareClick} pieceInstance={piece} key={Math.random()} onDropPiece={onDropPiece} col={col} row={row} black={black}>
                    {piece ? <Piece onPieceClick={onPieceClick} selected={selectedPiece?.col === col && selectedPiece.row === row} key={`${Math.random()}`} turn={turn} piece={piece}></Piece>: <>&emsp;</>}
                    </Square>
                rows.push(cell);
            }
            squares.push(<div>{rows}</div>)
            
        }
        return squares;
    }

    
    return <div> 
        <div className="my-4 min-h-[48px] max-w-[600px] break-words">
            {deadPieces.filter(c=> c.player === 0).map(d=> <span className="mx-2"><Piece piece={d}></Piece></span>)}
        </div>
        <div className=''>
                {getSquares()}
        </div>
        <div className="my-4 min-h-[48px] max-w-[600px] break-words">
            {deadPieces.filter(c=> c.player === 1).map(d=> <span className="mx-2"><Piece piece={d}></Piece></span>)}
            </div>
        <div className="max-h-60 overflow-y-auto">
            {[...logs].reverse().map(l=> <div className="my-2 ml-8">{l}</div>)}
        </div>
    </div>
}

export default Board