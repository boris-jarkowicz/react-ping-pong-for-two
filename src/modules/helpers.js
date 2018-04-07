
export function getPersistedPlayerData(state, persistedPlayerState) {
    const { playerId, playerName } = persistedPlayerState;
    const playerState = Object.assign({}, state.playerState, { playerId, playerName });
    
    return Object.assign({}, state, { playerState });
}
