import Joueur from './models/joueur'
import * from 'bdd.ts'

//TODO s'inscrire à la plateforme
//export inscrire(): 

//TODO vérifier que le nom d'utilisateur est unique
export function isUnique(playerName : string ) : boolean {
    //if(bd.contains(playerName)) {
    if(getUser())
        return false;
    } else {
        return true;
    }
}