zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
autoload bashcompinit && bashcompinit
autoload -Uz compinit
compinit
eval "$(zoxide init zsh)"
eval "$(starship init zsh)"

source <(fzf --zsh)
alias cd=z

alias v='nvim'

bindkey -v
bindkey jj vi-cmd-mode
bindkey jk vi-cmd-mode

source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
bindkey '^w' autosuggest-execute
bindkey '^e' autosuggest-accept

# Dirs
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias .....="cd ../../../.."
alias ......="cd ../../../../.."

# Eza
alias l="eza -l --icons --git -a"
alias lt="eza --tree --level=2 --long --icons --git"

alias yt='yt-dlp --cookies-from-browser safari'
alias cat=bat

# costum shortcuts
alias nmapp='sudo nmap --min-rate 20000  -A -sC -sV -v'
alias getproxy='curl https://github.com/wzdnzd/aggregator/issues/91 | grep "统一为" | head -n1 | sed -E "s/.*：(https.*token=).*统一为`(.*)`.*/\1\2/"| awk -F"`" "{print $1 "&target=quanx"}" | pbcopy'
alias behinder="java --module-path /opt/javafx-sdk-24.0.2/lib --add-modules javafx.controls,javafx.fxml  -jar ~/Documents/tools/behinder/behinder_bzxa.jar"

source ~/.venv/bin/activate

export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"

# pnpm
export PNPM_HOME="/Users/goku/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
