import { UmlClassDiagramModule } from './uml-class-diagram.module';

describe('UmlClassDiagramModule', () => {
  let umlClassDiagramModule: UmlClassDiagramModule;

  beforeEach(() => {
    umlClassDiagramModule = new UmlClassDiagramModule();
  });

  it('should create an instance', () => {
    expect(umlClassDiagramModule).toBeTruthy();
  });
});
