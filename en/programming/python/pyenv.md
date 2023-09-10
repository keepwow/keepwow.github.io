# Python Virtual Environment: pyenv & pyenv-virtualenv

## Why this?

pyenv lets you easily switch between multiple versions of Python. 

It's simple, unobtrusive, and follows the UNIX tradition of single-purpose tools that do one thing well.

See [pyenv](https://github.com/pyenv/pyenv) for more information.

## Installation

on macOS, run 

```bash
brew install pyenv pyenv-virtualenv
```

## Setup

```bash
# pyenv
export PYENV_ROOT="$HOME/.pyenv"
export PATH=$PYENV_ROOT/shims:$PATH
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

## Usage

```bash
pyenv versions                  # List Python versions on your system
pyenv install -v VERSION        # Install specific VERSION of Python
pyenv virtualenv VERSION PROJ   # Create a project with specific VERSION of Python
pyenv activate PROJ             # Activate the virtual env
pyenv deactivate                # Deactivate
... More ...
pyenv --help
```

## Attention

The PROJ is not a path, it is more inclined to version management at the system level, we can create a project path by ourselves, enter the corresponding path and then use the 'pyenv activate PROJ' command to achieve the desired effect, which is different from 'virtualenv'. A better approach is to use 'penv shell PROJ' to switch directly from any path to the project's virtual environment.

---

## Tips

It is way too slow in China.

Although the `pyenv` doesn't provide us a mirror site for downloading different versions, we can make it anyway.

### Principle

The way to install Python via `pyenv` is download the Python package and put it under `~/.pyenv/cache`. Then use `pyenv install` to get it work.

### Solution

1. Download the Python package manually.
2. Run `pyenv install`


### Example

```bash
% mkdir -pv ~/.pyenv/cache

% v=3.8.5; curl -L https://npm.taobao.org/mirrors/python/$v/Python-$v.tar.xz -o ~/.pyenv/cache/Python-$v.tar.xz; pyenv install $v

```

### General Way

- Create a function, then put it into `~/.zshrc`, pay attention to how `curl` is used here, or use `wget` instead if you like.

    - The usage of `curl` 

        ```bash
            -C, --continue-at <offset>

                Continue/Resume a previous file transfer at the given offset. The given offset is the exact number of  bytes  that will  be  skipped, counting from the beginning of the source file before it is transferred to the destination.  If used with uploads, the FTP server command SIZE will not be used by curl.

                Use "-C -" to tell curl to automatically find out where/how to resume the transfer. It then uses  the  given  out-put/input files to figure that out.

                If this option is used several times, the last one will be used.

                See also -r, --range.
        ```

    - The function looks like below

        ```bash
        function pyenv-install() {

            v=$1

            echo 'Installing Python' $v

            curl -C - -L https://npm.taobao.org/mirrors/python/$v/Python-$v.tar.xz -o ~/.pyenv/cache/Python-$v.tar.xz

            pyenv install $v

        }
        ```

- Now use `pyenv-install` to install any version of Python you'd like

    ```bash
    pyenv-install 3.9.2
    ```
