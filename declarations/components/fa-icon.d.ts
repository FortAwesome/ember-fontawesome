import Component from '@glimmer/component';
import { type AbstractElement, type FaSymbol, type FlipProp, type IconDefinition, type IconLookup, type IconName, type IconPrefix, type PullProp, type RotateProp, type SizeProp, type Transform } from '@fortawesome/fontawesome-svg-core';
import { type SafeString } from '@ember/template';
interface FaIconSignature {
    Element: SVGElement;
    Args: {
        icon: IconName | IconLookup | IconDefinition;
        prefix?: IconPrefix;
        flip?: FlipProp;
        spin?: boolean;
        pulse?: boolean;
        fixedWidth?: boolean;
        border?: boolean;
        listItem?: boolean;
        size?: SizeProp;
        rotation?: RotateProp;
        pull?: PullProp;
        transform?: Transform | string;
        symbol?: FaSymbol;
        title?: string;
        mask?: IconName | IconLookup | IconDefinition;
    };
}
export default class FaIconComponent extends Component<FaIconSignature> {
    get content(): SafeString;
    get safeStyle(): SafeString | undefined;
    get iconExists(): boolean;
    get flipHorizontal(): boolean;
    get flipVertical(): boolean;
    get classList(): string[];
    get abstractIcon(): AbstractElement | null;
    get iconAttributes(): Record<string, string>;
    get dataPrefix(): string;
    get dataIcon(): string;
    get dataFaTransform(): string;
    get dataFaMask(): string;
    get dataFaProcessed(): string;
    get ariaHidden(): string;
    get ariaLabelledBy(): string;
    get viewBox(): string;
    private normalizeIconArgs;
}
export {};
//# sourceMappingURL=fa-icon.d.ts.map