# tic-tac-toe
The Odin Project - Tic Tac Toe

An assignment from The Odin Project's Javascript course: https://www.theodinproject.com/courses/javascript/lessons/tic-tac-toe-javascript

## Features
The game can be played with two human players, two AI players, or one of each. AI play is optimised using a "minimax" algorithm. Players can set their name, and the game tracks score for each player across rounds.

## Learning outcomes
In the course of this project I practiced the use of modules and factory functions in Javascript extensively. Essentially all of the code is "namespaced" with almost no global code. This was my first time using these design patterns.

In implementing the AI system, I also practiced the use of recursive functions to create a version of the "minimax" algorithm.

## Areas for improvement
The AI should always select a winning move if available. Currently, although the AI uses "perfect" play, it may select a non-winning move when a winning move is available if the move selected will ultimately guarantee a win in any case. This may seem unintuitive.

There should be a delay before the AI moves. Currently, an AI player will move instantly after the game begins or the other player moves (and, both players are AI, the entire game will resolve instantly). It would be more compelling for the AI to pause between moves.

The visual design of the game and the page is very barebones and could be improved.
