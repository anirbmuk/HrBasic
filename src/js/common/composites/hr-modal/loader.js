define(['ojs/ojcomposite', 'text!./hr-modal.html', './hr-modal', 'text!./component.json'],
function(Composite, view, viewModel, metadata) {
    Composite.register('hr-modal', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
});