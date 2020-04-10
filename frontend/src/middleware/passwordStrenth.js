export const getPasswordStrenth = (password) => {
    // password strenth points: 
    //  numbers + 1
    //  letters + 1
    //  symbols + 2
    //  > 8 syllables + 1

    // 1 - weak
    // 2 - 3 - meduim
    // 4 - strong
    // 5 - ultra-strong

    if (!password) return {
        points: null,
        strenth: null
    }

    let points = 0;
    let hasNums = false,
        hasLetters = false,
        hasSymbols = false;
    
    if (password.length > 8) 
        points++;

    for (let i of password) {
        if (i >= '0' && i <= 9) {
            if (!hasNums) {
                hasNums = true;
                points++;
            }
        } else if (i.toLowerCase(i) >= 'a' && i.toLowerCase(i) <= 'z') {
            if (!hasLetters) {
                hasLetters = true;
                points++;
            }
        } else if (i !== ' ') {
            if (!hasSymbols) {
                hasSymbols = true;
                points += 2;
            }
        }
    }

    let result = 'Weak',
        className = "weak";

    if (points >= 2) {
        result = 'Medium';
        className = 'medium';
    }
    if (points >= 4) {
        result = 'Strong';
        className = 'strong';
    }
    if (points >= 5) {
        result = 'Ultra strong';
        className = 'ultra-strong';
    }
        
    
    return {
        points,
        className,
        strenth: result
    }
}
