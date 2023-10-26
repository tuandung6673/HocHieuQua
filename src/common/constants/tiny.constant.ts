const TinyMCE = {
    selector: 'editor',
    base_url: '/tinymce',
    suffix: '.min',
    toolbar: "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify | code",
    plugins: 'wordcount',
    encoding: 'raw'
}

export default TinyMCE