define(['ojs/ojcomposite',
        'text!./hr-chart.html',
        './hr-chart',
        'text!./component.json'],
function(Composite, view, viewModel, metadata) {
    Composite.register('hr-chart', {
        view,
        viewModel,
        metadata: JSON.parse(metadata)
    });
});