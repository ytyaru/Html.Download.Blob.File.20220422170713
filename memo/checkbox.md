# checkbox

## ジレンマ

　２つの書き方がある。label包含とfor連結である。

　label包含はチェックボックスの縦位置をセンタリングするようCSSセレクタを指定できる。

　for連結はチェックボックスにフォーカス遷移したときラベルの背景色を変更するようCSSセレクタを指定できる。

　だが、両方を実現することができない。つまり、チェックボックスにフォーカス遷移したときラベルの背景色を変更しつつ、さらにチェックボックスの縦位置をセンタリングすることができない。原因はCSSセレクタ指定方法の限界にある。

　これを解決する方法が、for連結のdiv包含である。

### label包含

html
```html
<label for="bom"><input type="checkbox" id="bom" name="bom" checked>BOM</label>
```

css
```css
input[type=checkbox]:focus-visible + label {
    background-color: #FFFF00;
    color: #000000;
}
```

* ⭕チェックボックスの縦位置をセンタリングするようCSSセレクタを指定する
* ❌チェックボックスにフォーカス遷移したときラベルの背景色を変更する

### for連結

```html
<input type="checkbox" id="bom" name="bom" checked>
<label for="bom">BOM</label>
```

css
```css
input[type=checkbox]:focus-visible + label {
    background-color: #FFFF00;
    color: #000000;
}
```

* ❌チェックボックスの縦位置をセンタリングするようCSSセレクタを指定する
* ⭕チェックボックスにフォーカス遷移したときラベルの背景色を変更する

### for連結をdivで包含する

```html
<div class="checkbox-center">
    <input type="checkbox" id="bom" name="bom" checked>
    <label for="bom">BOM</label>
</div>
```
```css
details.inline {
    display: inline-block;
}
details.inline > div.checkbox-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
```

* ⭕チェックボックスの縦位置をセンタリングするようCSSセレクタを指定する
* ⭕チェックボックスにフォーカス遷移したときラベルの背景色を変更する

