// @flow

import SearchResult from './search_result';

declare class MatchData extends Array<string> {
  index: number;
}

export type { MatchData };

/**
 * Encapsulate matching condition between a Strategy and current editor's value.
 */
export default class Query {
  strategy: any;
  term: string;
  match: MatchData;

  /**
   * @param {Strategy} strategy
   * @param {string} term
   * @param {MatchData} match
   */
  constructor(strategy: any, term: string, match: MatchData) {
    this.strategy = strategy;
    this.term = term;
    this.match = match;
  }

  /**
   * Invoke search strategy and callback the given function.
   *
   * @public
   * @param {function} callback
   */
  execute(callback: (SearchResult[]) => any): void {
    this.strategy.search(
      this.term,
      results => {
        callback(results.map(result => {
          return new SearchResult(result, this.term, this.strategy);
        }));
      },
      this.match
    );
  }
}
