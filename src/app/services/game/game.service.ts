import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private playerList!: string[];

  constructor() {
    this.playerList = JSON.parse(localStorage.getItem("playerList") || '[]');
  }

  addPlayer(player: string): void {
    this.playerList.push(player);
    localStorage.setItem('playerList', JSON.stringify(this.playerList))
  }

  removePlayer(player: string): void {
    this.playerList = this.playerList.filter(p => p !== player);
    localStorage.setItem('playerList', JSON.stringify(this.playerList))
  }

  getPlayerList(): string[] {
    return this.playerList;
  }
}
