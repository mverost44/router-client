curl https://router-jn.herokuapp.com/trips -XPOST \
  --header 'Content-Type: application/json' \
  --include \
  --data '
    {
      "trip": {
        "name": "'"${NAME}"'",
        "origin": "'"${ORIGIN}"'",
        "destination": "'"${DESTINATION}"'",
        "todo": "'"${TODO}"'",
        "distance": "'"${DISTANCE}"'"
      }
    }'
