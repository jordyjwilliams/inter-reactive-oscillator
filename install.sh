#!/bin/bash
# Color codes for output prints
GREEN="\033[0;32m"
RED="\033[0;31m"
MAGENTA="\033[35m"
YELLOW="\033[33m"
RESET="\033[0m"

echo -e "${RED}Installing${RESET} prerequisites for ${YELLOW}Inter-Reactive-Oscillator${RESET}"

## Check python, pip and npm are installed
command -v python3 >/dev/null 2>&1 || { echo >&2 -e "${YELLOW}python${RESET} is required, please install. ${RED}Aborting${RESET}."; exit 1; }
command -v pip3 >/dev/null 2>&1 || { echo >&2 -e "${YELLOW}pip${RESET} is required, please install. ${RED}Aborting${RESET}."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 -e "${YELLOW}npm${RESET} is required, please install. ${RED}Aborting${RESET}."; exit 1; }

echo -e "${YELLOW}python${RESET}, ${YELLOW}pip${RESET} and ${YELLOW}npm${RESET} installed. ${GREEN}Proceeding${RESET}:"

# Check if we need to install anything
command -v pre-commit >/dev/null 2>&1 && { echo >&2 -e "${YELLOW}pre-commit${RESET} already installed. ${MAGENTA}Skipping${RESET}."; }
command -v pnpm >/dev/null 2>&1 && { echo >&2 -e "${YELLOW}pnpm${RESET} already installed. ${MAGENTA}Skipping${RESET}."; }
command -v cz >/dev/null 2>&1 && { echo >&2 -e "${YELLOW}Commitizen${RESET} already installed. ${MAGENTA}Skipping${RESET}."; }

# Need to install
# Install all packages, only if required...
command -v pre-commit >/dev/null 2>&1 || {
    echo >&2 -e "${RED}Installing:${YELLOW} pre-commit${RESET} from ${YELLOW}pip${RESET}";
    pip install pre-commit;
    }
command -v cz >/dev/null 2>&1 || {
    echo >&2 -e "${RED}Installing:${YELLOW} commitizen ${RESET} from ${YELLOW}pip${RESET}";
    pip install commitizen;
    }
command -v pnpm >/dev/null 2>&1 || {
    echo >&2 -e "${RED}Installing:${YELLOW} pnpm ${RESET} from ${YELLOW}npm${RESET}";
    npm i -g pnpm;
    }

echo -e "${RED}Installing:${YELLOW} pre-commit hooks ${RESET} from ${GREEN}.pre-commit-config.yaml${RESET} with ${YELLOW}pre-commit${RESET}"
pre-commit install --hook-type commit-msg --hook-type pre-push

echo -e "${RED}Installing:${YELLOW} Inter-Reactive-Oscillator Project ${RESET} from ${GREEN}package.json${RESET} with ${YELLOW}pnpm${RESET}"
pnpm i
