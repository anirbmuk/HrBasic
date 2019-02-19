define(['ojs/ojcomposite', 'text!./hr-badge.html', './hr-badge', 'text!./component.json', 'css!./styles'],
function(Composite, view, viewModel, metadata) {
    Composite.register('hr-badge', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
});