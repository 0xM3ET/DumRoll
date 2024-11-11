local json = require("json")

local yellowPath = {
    -- Yellow player path
    { 13, 6 }, { 12, 6 }, { 11, 6 }, { 10, 6 }, { 9, 6 }, { 8, 6 },
    { 8,  5 }, { 8, 4 }, { 8, 3 }, { 8, 2 }, { 8, 1 }, { 8, 0 },
    { 7, 0 }, { 6, 0 },
    { 6, 1 }, { 6, 2 }, { 6, 3 }, { 6, 4 }, { 6, 5 },
    { 6, 6 }, { 5, 6 }, { 4, 6 }, { 3, 6 }, { 2, 6 }, { 1, 6 }, { 0, 6 },
    { 0, 7 }, { 0, 8 },
    { 1, 8 }, { 2, 8 }, { 3, 8 }, { 4, 8 }, { 5, 8 }, { 6, 8 },
    { 6, 9 }, { 6, 10 }, { 6, 11 }, { 6, 12 }, { 6, 13 }, { 6, 14 },
    { 7, 14 }, { 8, 14 },
    { 8, 13 }, { 8, 12 }, { 8, 11 }, { 8, 10 }, { 8, 19 }, { 8, 8 },
    { 9,  8 }, { 10, 8 }, { 11, 8 }, { 12, 8 }, { 13, 8 }, { 14, 8 },
    { 14, 7 }, { 13, 7 }, { 12, 7 }, { 11, 7 }, { 10, 7 }, { 9, 7 }, { 8, 7 }, { 7, 7 }
}

-- This will store the current index of the yellow piece on the path
local yellowPositionIndex = 0

-- Handler for DiceRoll action
Handlers.add("DiceRoll",
    Handlers.utils.hasMatchingTag("Action", "DiceRoll"),
    function(msg)
        -- Roll the dice
        local diceRoll = math.random(1, 6)

        -- Calculate the new position index
        local newIndex = yellowPositionIndex + diceRoll

        -- Ensure the new index doesn't exceed the path length
        if newIndex > #yellowPath then
            newIndex = newIndex % #yellowPath
        end

        -- Update the yellow piece position index
        yellowPositionIndex = newIndex

        -- Get the new cell position on the yellowPath
        local newCell = yellowPath[yellowPositionIndex + 1] -- Lua is 1-indexed

        -- Prepare the response with dice roll and new position
        local responseData = {
            diceRoll = diceRoll,
            newPosition = {
                row = newCell[1],
                col = newCell[2]
            }
        }

        -- Send the response back to the client
        Send({
            Target = msg.From,
            Data = json.encode(responseData)
        })
    end
)
