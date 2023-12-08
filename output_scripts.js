function onload_script() {
    const fetchData = async () => {
        const data = await fetch(
                'https://raw.githubusercontent.com/papad21297/gitdrive/main/unread_webtoon.txt'
                // 'http://localhost:3000/output_source.txt'
        )
        return data.text()
    }
    fetchData().then((data) => { inject_content(data) })
}

function inject_content(data) {
    let splitted_data = data.split('\n')
    let reference_node = document.querySelector('#title_text')
    for (let i = 0; i < splitted_data.length; i++) {
        const item = splitted_data[i] + '_'
        let new_node = document.createElement('div')
        new_node.setAttribute('id', 'line_item')
        console.log('splitted lines:')
        const splitted_item = split_line(item)
        for (let j = 0; j < splitted_item.length; j++) {
            let new_joined_node = document.createElement('div')
            new_joined_node.setAttribute('id', 'cell_item')
            let val_node = document.createTextNode(splitted_item[j].replace(/ /g, '-'))
            if (splitted_item[j] == ' ') {
                new_joined_node.style.color = 'hsl(0, 0%, 30%)'
            }
            else if (splitted_item[j].charCodeAt(1) == 3635) {
                new_joined_node.style.width = '2.1vw'
            }
            new_joined_node.appendChild(val_node)
            new_node.appendChild(new_joined_node)
        }
        reference_node.appendChild(new_node)
    }
    let filler_node = document.createElement('div')
    filler_node.setAttribute('id', 'bottom_filler')
    reference_node.appendChild(filler_node)
}

function split_line(item) {
    let base_index = 3585
    let returning_array = []
    let char_group = ''
    for (let i = 0; i < (item.length - 1); i++) {
        char_group += item[i]
        const char_code_from_base = item[i + 1].charCodeAt(0) - base_index
        if (check_lone_char(char_code_from_base) == 1) {
            returning_array.push(char_group)
            char_group = ''
        }
    }
    return returning_array
}

function check_lone_char(char_code_from_base) {
    check_result = 0
    if (
        (char_code_from_base != 48)
        && (
                (char_code_from_base < 50)
                || (char_code_from_base > 57)
        )
        && (
                (char_code_from_base < 70)
                || (char_code_from_base > 76)
        )
    ) {
        check_result = 1
    }
    return check_result
}
