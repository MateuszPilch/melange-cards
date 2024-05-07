import { Injectable } from '@angular/core';
import { Player } from '../../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private playerList!: Player[];

  constructor() {
    this.playerList = JSON.parse(localStorage.getItem("playerList") || '[]');
  }

  addPlayer(player: Player): void {
    this.playerList.push(player);
    localStorage.setItem('playerList', JSON.stringify(this.playerList))
  }

  removePlayer(player: Player): void {
    this.playerList = this.playerList.filter(p => p !== player);
    localStorage.setItem('playerList', JSON.stringify(this.playerList))
  }

  getPlayerList(): Player[] {
    return this.playerList;
  }
}
