local json = require("json")

Handlers.add("DiceRoll",
    Handlers.utils.hasMatchingTag("Action", "DiceRoll"),
    function(msg)
        local diceRoll = math.random(1,6)

        Send({
            Target = msg.From,
            Data = json.encode({
                diceRoll = diceRoll
            })
        })
    end    
)