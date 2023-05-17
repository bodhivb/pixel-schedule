import { HTMLView } from "./htmlView";
import { createButton } from "../elements/button";
import { SearchListComponent } from "../components/searchListComponent";

export class SearchView extends HTMLView {
  private searchList: SearchListComponent;
  private searchButton: HTMLButtonElement;

  private isOpen: boolean = false;

  constructor() {
    super();

    // Create the Search button
    this.searchButton = createButton("Search teacher");
    this.searchButton.id = "searchButton";
    this.searchButton.className = "greenBox";
    this.searchButton.onclick = () => {
      this.isOpen ? this.closeSearch() : this.openSearch();
    };
    this.Add(this.searchButton);

    // Create the Search popup
    this.searchList = new SearchListComponent();
  }

  private openSearch() {
    this.Add(this.searchList.view, false);
    this.isOpen = true;
  }

  private closeSearch() {
    this.Remove(this.searchList.view);
    this.isOpen = false;
  }
}
