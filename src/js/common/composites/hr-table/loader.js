define(['ojs/ojcomposite', 'text!./hr-table.html', './hr-table', 'text!./component.json'],
function(Composite, view, viewModel, metadata) {
    Composite.register('hr-table', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
});