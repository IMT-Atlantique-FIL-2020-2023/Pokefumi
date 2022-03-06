#!/bin/sh


# ⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⣠⣤⣶⣶
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⢰⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣀⣀⣾⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⡏⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
# ⣿⣿⣿⣿⣿⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
# ⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿
# ⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿

printf "Création de l'utilisateur\\n"
username=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1)
password=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1)
username2=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1)
password2=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1)

printf "Username: %s, password: %s\\n" "$username" "$password"
printf "Username2: %s, password2: %s\\n" "$username2" "$password2"


userId=$(node -pe 'JSON.parse(process.argv[1]).id' "$(curl -s -X POST http://127.0.0.1:8000/userservice/users \
        -H 'Content-Type: application/json' \
        -H 'Accept: application/json' \
-d '{"username":"'"$username"'","password":"'"$password"'", "statut": "online", "score": 0}')")
printf "UserId: %s\\n" "$userId"

userId2=$(node -pe 'JSON.parse(process.argv[1]).id' "$(curl -s -X POST http://127.0.0.1:8000/userservice/users \
        -H 'Content-Type: application/json' \
        -H 'Accept: application/json' \
-d '{"username":"'"$username2"'","password":"'"$password2"'", "statut": "online", "score": 0}')")
printf "UserId2: %s\\n" "$userId2"

curl -o - -X GET http://127.0.0.1:8000/userservice/users \
-H 'Accept: application/json'
echo

printf "Connection de l'utilisateur\\n"
echo "JWT Token:"
jwt=$(node -pe 'JSON.parse(process.argv[1]).content.replace(/"/g, "")' "$(curl -s -X POST "http://127.0.0.1:8000/userservice/auth/connect?username=$username&password=$password" -H 'Accept: application/json')")
echo
echo "$jwt"

echo "JWT Token:"
jwt2=$(node -pe 'JSON.parse(process.argv[1]).content.replace(/"/g, "")' "$(curl -s -X POST "http://127.0.0.1:8000/userservice/auth/connect?username=$username2&password=$password2" -H 'Accept: application/json')")
echo
echo "$jwt2"

echo "Création du match..."
echo "Deck: [13, 3, 25, 80, 5, 6, 7, 8, 9, 10]"
matchId=$(node -pe 'JSON.parse(process.argv[1]).id' "$(curl -X PUT http://127.0.0.1:8000/matchmakingservice/matchs \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H "Authorization: Bearer $jwt" \
-d '{"opponentId": '"$userId2"', "deck": [13, 3, 25, 80, 5, 6, 7, 8, 9, 10]}')")
echo "MatchId: $matchId"

echo "Accès au match..."

curl -X POST "http://127.0.0.1:8000/matchmakingservice/matchs/$matchId/join" \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H "Authorization: Bearer $jwt2" \
-d '[13, 3, 25, 80, 5, 6, 7, 8, 9, 10]'
echo

# Pourrait être mieux, mais juste pour tester
for i in $(seq 1 9);
do
    echo "Résolution du round $i..."
    
    curl -s -X PUT "http://127.0.0.1:8000/roundservice/match" \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -H "Authorization: Bearer $jwt" \
    -d '{"idMatch": '"$matchId"', "idxPokemonDeck": 3}' > /dev/null & # notez bien le "&"
    echo
    
    curl -o - -X PUT "http://127.0.0.1:8000/roundservice/match" \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -H "Authorization: Bearer $jwt2" \
    -d '{"idMatch": '"$matchId"', "idxPokemonDeck": 4}'
    
    echo
done

echo "Affichage du match..."
curl -s -X GET "http://127.0.0.1:8000/matchmakingservice/matchs/$matchId" \
-H 'Accept: application/json'
echo
echo
echo "Affichage des joueurs..."
curl -s -X GET "http://127.0.0.1:8000/userservice/users/$userId" \
-H 'Accept: application/json'
echo
echo
curl -s -X GET "http://127.0.0.1:8000/userservice/users/$userId2" \
-H 'Accept: application/json'
echo
echo
echo "Affichage des statistiques..."
echo "Rounds par pokemon :"
curl -s -X GET http://127.0.0.1:8000/statsservice/pokemons/rounds \
-H 'Accept: application/json'
echo
echo
echo "Nombre de rounds par jour pour les 30 derniers jours :"
curl -s -X GET http://127.0.0.1:8000/statsservice/rounds/count-a-day-last-30-days \
-H 'Accept: application/json'
echo


