import { File, Namespace, StringImport, VariableDeclaration } from 'typescript-parser';
import { ExtensionContext } from 'vscode';

import ResourceStructureTreeItem from '../../../src/code-outline/resource-structure-tree-item';
import ioc from '../../../src/ioc';
import iocSymbols from '../../../src/ioc-symbols';
import { expect } from '../setup';

declare global {
  namespace Chai {
    interface Assertion {
      matchSnapshot(): Assertion;
    }
  }
}

describe('ResourceStructureTreeItem', () => {

  let context: ExtensionContext;

  before(() => {
    context = ioc.get<ExtensionContext>(iocSymbols.extensionContext);
  });

  it('should create a tree item', () => {
    const resource = new File('./path', '/root', 0, 100);
    const item = new ResourceStructureTreeItem(resource, context);

    expect(item).to.exist;
  });

  it('should return correct children', () => {
    const resource = new File('./path', '/root', 0, 100);
    resource.imports.push(new StringImport('str-imp'));
    resource.declarations.push(new VariableDeclaration('var', false, false, undefined));
    resource.resources.push(new Namespace('namespace', 10, 20));

    const item = new ResourceStructureTreeItem(resource, context);

    expect(item.getChildren().map(c => ({ label: c.label, ctor: c.constructor.name }))).to.matchSnapshot();
  });

});
